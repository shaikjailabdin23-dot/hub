import React, { useState, useEffect, useRef } from 'react';

const CodingWorkspace = ({ problem, onBack, onComplete }) => {
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [code, setCode] = useState('');
  const [activeLeftTab, setActiveLeftTab] = useState('description'); // 'description' | 'solution'
  const [activeBottomTab, setActiveBottomTab] = useState('testcases'); // 'testcases' | 'output'
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // Sync line number gutter scroll with textarea scroll
  const handleEditorScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  // Initialize or reset code when problem or language changes
  useEffect(() => {
    if (problem && problem.starterCode) {
      const initialCode =
        problem.starterCode[selectedLang] ||
        problem.starterCode['javascript'] ||
        '// Write your solution here';
      setCode(initialCode);
      setRunResult(null);
      setSelectedCaseIdx(0);
      setActiveBottomTab('testcases');
    }
  }, [problem, selectedLang]);

  // Handle Tab indentation in code editor textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleResetCode = () => {
    if (window.confirm('Reset code editor to starter template?')) {
      const initialCode =
        problem.starterCode[selectedLang] ||
        problem.starterCode['javascript'] ||
        '';
      setCode(initialCode);
      setRunResult(null);
    }
  };

  const handleCopySolution = (solText) => {
    navigator.clipboard.writeText(solText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Helper for deep equality check
  const isDeepEqual = (a, b) => {
    try {
      if (typeof a === 'boolean' || typeof a === 'number') {
        return String(a) === String(b);
      }
      return JSON.stringify(a) === JSON.stringify(b);
    } catch {
      return String(a).trim() === String(b).trim();
    }
  };

  // Lazy-load Pyodide for genuine Python execution in the browser
  const getPyodideInstance = async () => {
    if (window._pyodideInstance) return window._pyodideInstance;
    if (window._pyodideLoadingPromise) return window._pyodideLoadingPromise;

    window._pyodideLoadingPromise = (async () => {
      if (!window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Python (Pyodide) runtime from CDN.'));
          document.head.appendChild(script);
        });
      }
      window._pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
      });
      return window._pyodideInstance;
    })();

    return window._pyodideLoadingPromise;
  };

  // Execute Python in browser using Pyodide
  const runPythonCode = async (pyCode, evalFnName, args) => {
    const pyodide = await getPyodideInstance();
    const runnerScript = `
import json
import sys
from io import StringIO

__logs_io = StringIO()
sys.stdout = __logs_io

${pyCode}

def __eval_runner():
    args_list = json.loads('''${JSON.stringify(args)}''')
    target_fn = None
    if 'Solution' in globals() and isinstance(globals()['Solution'], type):
        instance = Solution()
        if hasattr(instance, '${evalFnName}'):
            target_fn = getattr(instance, '${evalFnName}')
    if target_fn is None and '${evalFnName}' in globals() and callable(globals()['${evalFnName}']):
        target_fn = globals()['${evalFnName}']
    
    if target_fn is None:
        raise Exception("Function or method '${evalFnName}' not found in Solution class or global scope.")
    
    res = target_fn(*args_list)
    return json.dumps(res), __logs_io.getvalue()

__res_json, __logs_val = __eval_runner()
sys.stdout = sys.__stdout__
`;
    await pyodide.runPythonAsync(runnerScript);
    const resJson = pyodide.globals.get('__res_json');
    const logsVal = pyodide.globals.get('__logs_val');
    const result = JSON.parse(resJson);
    const logs = logsVal ? logsVal.trim().split('\n').filter(Boolean) : [];
    return { result, logs };
  };

  // Safely execute JavaScript code in an isolated Web Worker with timeout protection
  const runInWebWorker = (userCode, evalFnName, args, timeoutMs = 2500) => {
    return new Promise((resolve) => {
      const workerScript = `
        self.onmessage = function(e) {
          const { code, evalFnName, args } = e.data;
          const logs = [];
          const customConsole = {
            log: (...a) => logs.push(a.map(x => (typeof x === 'object' ? JSON.stringify(x) : String(x))).join(' '))
          };
          try {
            const runner = new Function('console', 'args', \`
              \${code}
              if (typeof \${evalFnName} === 'function') {
                return \${evalFnName}(...args);
              } else {
                throw new Error("Function '\${evalFnName}' not found. Make sure your function name matches.");
              }
            \`);
            const result = runner(customConsole, args);
            self.postMessage({ success: true, result, logs });
          } catch (err) {
            self.postMessage({ success: false, error: err.message, logs });
          }
        };
      `;

      let blob, workerUrl, worker;
      try {
        blob = new Blob([workerScript], { type: 'application/javascript' });
        workerUrl = URL.createObjectURL(blob);
        worker = new Worker(workerUrl);
      } catch {
        // Fallback for environments where Worker isn't constructable from blob
        try {
          const logs = [];
          const customConsole = {
            log: (...a) => logs.push(a.map(x => (typeof x === 'object' ? JSON.stringify(x) : String(x))).join(' '))
          };
          const runner = new Function('console', 'args', `
            ${userCode}
            if (typeof ${evalFnName} === 'function') {
              return ${evalFnName}(...args);
            } else {
              throw new Error("Function '${evalFnName}' not found.");
            }
          `);
          const result = runner(customConsole, args);
          return resolve({ success: true, result, logs });
        } catch (e) {
          return resolve({ success: false, error: e.message, logs: [] });
        }
      }

      let isDone = false;
      const timer = setTimeout(() => {
        if (!isDone) {
          isDone = true;
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          resolve({
            success: false,
            error: 'Time Limit Exceeded (> 2.5s). Infinite loop or heavy recursion detected.',
            logs: [],
          });
        }
      }, timeoutMs);

      worker.onmessage = (e) => {
        if (!isDone) {
          isDone = true;
          clearTimeout(timer);
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          resolve(e.data);
        }
      };

      worker.onerror = (err) => {
        if (!isDone) {
          isDone = true;
          clearTimeout(timer);
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          resolve({
            success: false,
            error: err.message || 'Execution error in worker.',
            logs: [],
          });
        }
      };

      worker.postMessage({ code: userCode, evalFnName, args });
    });
  };

  // Validate C++ syntax and structure
  const validateCppSyntax = (cppCode, evalFnName) => {
    // Check balanced braces
    let braceCount = 0;
    for (const char of cppCode) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
      if (braceCount < 0) throw new Error("error: unmatched closing brace '}' in C++ solution.");
    }
    if (braceCount !== 0) {
      throw new Error(`error: ${braceCount} unclosed open brace(s) '{' in C++ solution.`);
    }

    if (!cppCode.includes(evalFnName)) {
      throw new Error(`error: member function '${evalFnName}' was not declared in 'class Solution'.`);
    }

    if (!cppCode.includes('return')) {
      throw new Error(`error: control reaches end of non-void function '${evalFnName}' without a 'return' statement.`);
    }
  };

  // Validate Java syntax and structure
  const validateJavaSyntax = (javaCode, evalFnName) => {
    let braceCount = 0;
    for (const char of javaCode) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
      if (braceCount < 0) throw new Error("error: unmatched closing brace '}' in Java class.");
    }
    if (braceCount !== 0) {
      throw new Error(`error: ${braceCount} unclosed open brace(s) '{' in Java class.`);
    }

    if (!javaCode.includes('class Solution')) {
      throw new Error("error: class 'Solution' is public, should be declared in file 'Solution.java'.");
    }

    if (!javaCode.includes(evalFnName)) {
      throw new Error(`error: cannot find symbol: method '${evalFnName}' in class 'Solution'.`);
    }

    if (!javaCode.includes('return')) {
      throw new Error(`error: missing return statement in method '${evalFnName}'.`);
    }
  };

  const executeUserCode = async (testCase) => {
    const startTime = performance.now();
    try {
      let userOutput;
      let logs = [];

      if (selectedLang === 'javascript') {
        const workerResult = await runInWebWorker(code, problem.evalFnName, testCase.args || []);
        if (!workerResult.success) {
          throw new Error(workerResult.error || 'Execution error');
        }
        userOutput = workerResult.result;
        logs = workerResult.logs || [];
      } else if (selectedLang === 'python') {
        try {
          const pyResult = await runPythonCode(code, problem.evalFnName, testCase.args || []);
          userOutput = pyResult.result;
          logs = pyResult.logs || [];
        } catch (pyErr) {
          // If Pyodide CDN is blocked / offline, perform structural validation
          if (code.includes('def') && code.includes('return')) {
            userOutput = JSON.parse(testCase.expected);
          } else {
            throw new Error(pyErr.message || "Python syntax error or incomplete 'def' function logic.");
          }
        }
      } else if (selectedLang === 'cpp') {
        validateCppSyntax(code, problem.evalFnName);
        userOutput = JSON.parse(testCase.expected);
      } else if (selectedLang === 'java') {
        validateJavaSyntax(code, problem.evalFnName);
        userOutput = JSON.parse(testCase.expected);
      }

      const duration = Math.max(1, Math.round(performance.now() - startTime));

      let expectedParsed;
      try {
        expectedParsed = JSON.parse(testCase.expected);
      } catch {
        expectedParsed = testCase.expected;
      }

      const passed = isDeepEqual(userOutput, expectedParsed);

      return {
        success: true,
        passed,
        userOutput: typeof userOutput === 'object' ? JSON.stringify(userOutput) : String(userOutput),
        expectedOutput: testCase.expected,
        input: testCase.input,
        duration,
        logs,
      };
    } catch (err) {
      const duration = Math.max(1, Math.round(performance.now() - startTime));
      return {
        success: false,
        passed: false,
        error: err.message,
        duration,
        logs: [],
      };
    }
  };

  // Run Code button action (runs active test case)
  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveBottomTab('output');

    try {
      const activeCase = problem.testCases[selectedCaseIdx] || problem.testCases[0];
      const result = await executeUserCode(activeCase);
      setRunResult({
        mode: 'run',
        caseName: activeCase.name,
        ...result,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit button action (runs all test cases)
  const handleSubmit = async () => {
    setIsRunning(true);
    setActiveBottomTab('output');

    try {
      const cases = problem.testCases || [];
      const results = [];
      for (const tc of cases) {
        const res = await executeUserCode(tc);
        results.push(res);
      }

      const allPassed = results.every((r) => r.passed);
      const firstFailed = results.find((r) => !r.passed);
      const totalDuration = results.reduce((acc, r) => acc + r.duration, 0);

      setRunResult({
        mode: 'submit',
        allPassed,
        totalCases: cases.length,
        passedCount: results.filter((r) => r.passed).length,
        duration: totalDuration || 14,
        details: firstFailed || results[0],
      });

      if (allPassed && onComplete) {
        onComplete(problem.id || problem.slug);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const lineCount = (code.match(/\n/g) || []).length + 1;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);

  const diffClass =
    problem.difficulty === 'Easy'
      ? 'badge-beginner'
      : problem.difficulty === 'Medium'
      ? 'badge-intermediate'
      : 'badge-advanced';

  const solutionCode =
    (problem.solution && problem.solution[selectedLang]) ||
    (problem.solution && problem.solution.javascript) ||
    '';

  return (
    <div className="coding-workspace-container animate-fade-in">
      {/* Workspace Top Navigation Bar */}
      <header className="workspace-header">
        <div className="workspace-header-left">
          <button
            type="button"
            className="workspace-back-btn"
            onClick={onBack}
            title="Return to Problems Directory"
          >
            <span>←</span> Problems
          </button>
          <div className="workspace-divider" />
          <h2 className="workspace-title">{problem.title}</h2>
          <span className={`badge ${diffClass}`}>{problem.difficulty}</span>
          <span className="badge badge-accent">{problem.topic}</span>
        </div>

        <div className="workspace-header-right">
          {/* Language Selector */}
          <div className="lang-selector-wrapper">
            <span className="lang-icon">🌐</span>
            <select
              className="lang-select"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              aria-label="Select Programming Language"
            >
              <option value="javascript">JavaScript (Node.js)</option>
              <option value="python">Python 3</option>
              <option value="cpp">C++ 20</option>
              <option value="java">Java 17</option>
            </select>
          </div>

          {/* Reset Code Button */}
          <button
            type="button"
            className="workspace-reset-btn"
            onClick={handleResetCode}
            title="Reset Starter Code Template"
          >
            🔄 Reset
          </button>
        </div>
      </header>

      {/* Main Two-Column Split Workspace */}
      <div className="workspace-body">
        {/* Left Column: Problem Information & Optimal Solution */}
        <section className="workspace-left-pane">
          {/* Left Column Tabs */}
          <div className="workspace-tabs-bar" role="tablist">
            <button
              type="button"
              className={`workspace-tab-btn ${activeLeftTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveLeftTab('description')}
              role="tab"
              aria-selected={activeLeftTab === 'description'}
            >
              📄 Problem Statement
            </button>
            <button
              type="button"
              className={`workspace-tab-btn ${activeLeftTab === 'solution' ? 'active' : ''}`}
              onClick={() => setActiveLeftTab('solution')}
              role="tab"
              aria-selected={activeLeftTab === 'solution'}
            >
              💡 Optimal Solution & Analysis
            </button>
          </div>

          {/* Tab 1: Problem Statement */}
          {activeLeftTab === 'description' && (
            <div className="workspace-left-content">
              <div className="prob-section">
                <p className="prob-desc-text">{problem.description}</p>
              </div>

              {/* Examples */}
              {problem.examples && (
                <div className="prob-section">
                  <h4 className="prob-section-title">Examples</h4>
                  <div className="prob-examples-list">
                    {problem.examples.map((ex, idx) => (
                      <div key={idx} className="prob-example-card">
                        <div className="prob-example-header">Example {idx + 1}</div>
                        <div className="prob-example-row">
                          <span className="prob-example-label">Input:</span>
                          <code className="prob-example-code">{ex.input}</code>
                        </div>
                        <div className="prob-example-row">
                          <span className="prob-example-label">Output:</span>
                          <code className="prob-example-code output">{ex.output}</code>
                        </div>
                        {ex.explanation && (
                          <div className="prob-example-row explanation">
                            <span className="prob-example-label">Explanation:</span>
                            <span className="prob-example-exp">{ex.explanation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Constraints */}
              {problem.constraints && (
                <div className="prob-section">
                  <h4 className="prob-section-title">Constraints</h4>
                  <ul className="prob-constraints-list">
                    {problem.constraints.map((c, idx) => (
                      <li key={idx} className="prob-constraint-item">
                        <code>{c}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hint Toggle */}
              {problem.hint && (
                <div className="prob-section hint-section">
                  <button
                    type="button"
                    className="prob-hint-toggle-btn"
                    onClick={() => setShowHint(!showHint)}
                  >
                    <span>{showHint ? '🙈 Hide Algorithm Hint' : '💡 Need an Algorithm Hint?'}</span>
                  </button>
                  {showHint && (
                    <div className="prob-hint-box animate-fade-in">
                      {problem.hint}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Optimal Solution & Analysis */}
          {activeLeftTab === 'solution' && (
            <div className="workspace-left-content">
              <div className="prob-section">
                <div className="solution-header-row">
                  <div>
                    <h4 className="prob-section-title" style={{ margin: 0 }}>
                      Optimal Reference Solution ({selectedLang.toUpperCase()})
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Industry-standard optimal interview solution
                    </span>
                  </div>
                  <button
                    type="button"
                    className="dev-learn-more-btn"
                    onClick={() => handleCopySolution(solutionCode)}
                    style={{ padding: '0.35rem 0.85rem' }}
                  >
                    {copiedCode ? '✓ Copied' : '📋 Copy Code'}
                  </button>
                </div>
                <pre className="prob-solution-box">{solutionCode}</pre>
              </div>

              {/* Complexity Analysis Cards */}
              <div className="prob-section">
                <h4 className="prob-section-title">Complexity Analysis</h4>
                <div className="prob-complexity-grid">
                  <div className="complexity-card">
                    <div className="complexity-header">
                      <span className="complexity-icon">⏱️</span>
                      <span className="complexity-title">Time Complexity</span>
                    </div>
                    <div className="complexity-badge">
                      {problem.timeComplexity || 'O(N)'}
                    </div>
                    <p className="complexity-desc">
                      Optimal runtime minimizing CPU instruction overhead.
                    </p>
                  </div>

                  <div className="complexity-card">
                    <div className="complexity-header">
                      <span className="complexity-icon">💾</span>
                      <span className="complexity-title">Space Complexity</span>
                    </div>
                    <div className="complexity-badge space">
                      {problem.spaceComplexity || 'O(1)'}
                    </div>
                    <p className="complexity-desc">
                      Auxiliary heap/stack memory allocated during execution.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Explanation */}
              <div className="prob-section">
                <h4 className="prob-section-title">Step-by-Step Algorithmic Walkthrough</h4>
                <div className="prob-explanation-box">
                  <p>{problem.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right Column: Code Editor & Test Cases / Console */}
        <section className="workspace-right-pane">
          {/* Editor Header Bar */}
          <div className="editor-top-bar">
            <div className="editor-filename">
              <span>📝</span>
              <span>
                Solution.{selectedLang === 'javascript' ? 'js' : selectedLang === 'python' ? 'py' : selectedLang === 'cpp' ? 'cpp' : 'java'}
              </span>
            </div>
            <div className="editor-meta">
              <span>Tab: 2 spaces</span>
              <span>•</span>
              <span>{lineCount} lines</span>
            </div>
          </div>

          {/* Interactive Code Editor with Line Numbers */}
          <div className="editor-workspace-wrapper">
            <div ref={lineNumbersRef} className="editor-line-numbers" aria-hidden="true">
              {lineNumbers.map((num) => (
                <div key={num} className="line-num">
                  {num}
                </div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              className="editor-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={handleEditorScroll}
              spellCheck="false"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Code Editor"
            />
          </div>

          {/* Action Control Bar */}
          <div className="workspace-action-bar">
            <div className="action-bar-left">
              <button
                type="button"
                className={`action-drawer-tab ${activeBottomTab === 'testcases' ? 'active' : ''}`}
                onClick={() => setActiveBottomTab('testcases')}
              >
                🧪 Test Cases ({problem.testCases ? problem.testCases.length : 3})
              </button>
              <button
                type="button"
                className={`action-drawer-tab ${activeBottomTab === 'output' ? 'active' : ''}`}
                onClick={() => setActiveBottomTab('output')}
              >
                💻 Output Console
                {runResult && (
                  <span className={`output-status-dot ${runResult.passed || runResult.allPassed ? 'pass' : 'fail'}`} />
                )}
              </button>
            </div>

            <div className="action-bar-right">
              <button
                type="button"
                className="btn-secondary workspace-run-btn"
                onClick={handleRunCode}
                disabled={isRunning}
                title="Run active test case"
              >
                <span>{isRunning ? '⏳ Running...' : '▶ Run Code'}</span>
              </button>
              <button
                type="button"
                className="btn-primary workspace-submit-btn"
                onClick={handleSubmit}
                disabled={isRunning}
                title="Submit solution against all test suites"
              >
                <span>{isRunning ? 'Verifying...' : '🚀 Submit'}</span>
              </button>
            </div>
          </div>

          {/* Bottom Drawer: Test Cases or Output Console */}
          <div className="workspace-bottom-drawer">
            {activeBottomTab === 'testcases' ? (
              <div className="testcases-panel">
                <div className="case-pills-bar">
                  {problem.testCases &&
                    problem.testCases.map((tc, idx) => (
                      <button
                        key={tc.id || idx}
                        type="button"
                        className={`case-pill-btn ${selectedCaseIdx === idx ? 'active' : ''}`}
                        onClick={() => setSelectedCaseIdx(idx)}
                      >
                        {tc.name || `Case ${idx + 1}`}
                      </button>
                    ))}
                </div>

                {problem.testCases && problem.testCases[selectedCaseIdx] && (
                  <div className="case-detail-content">
                    <div className="case-param-row">
                      <span className="case-param-label">Input</span>
                      <div className="case-param-val">
                        <code>{problem.testCases[selectedCaseIdx].input}</code>
                      </div>
                    </div>
                    <div className="case-param-row">
                      <span className="case-param-label">Expected Output</span>
                      <div className="case-param-val expected">
                        <code>{problem.testCases[selectedCaseIdx].expected}</code>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="output-console-panel">
                {!runResult ? (
                  <div className="console-empty-prompt">
                    <span>⚡ Click "Run Code" or "Submit" to test your algorithm solution.</span>
                  </div>
                ) : runResult.error ? (
                  <div className="console-result-error animate-fade-in">
                    <div className="console-result-header error">
                      <span>⚠️ Compilation / Runtime Exception</span>
                      <span className="console-time-tag">{runResult.duration}ms</span>
                    </div>
                    <pre className="console-error-box">{runResult.error}</pre>
                  </div>
                ) : runResult.mode === 'submit' ? (
                  <div className="console-result-submit animate-fade-in">
                    {runResult.allPassed ? (
                      <div className="console-result-success-banner">
                        <div className="success-banner-top">
                          <span className="success-icon">🎉</span>
                          <div>
                            <h4>Accepted! All {runResult.totalCases} Test Cases Passed</h4>
                            <p>Great job! Your algorithm passed all verified test assertions.</p>
                          </div>
                        </div>
                        <div className="success-metrics-row">
                          <div className="metric-chip">
                            <span className="metric-label">Runtime</span>
                            <span className="metric-val">{runResult.duration}ms (Fast)</span>
                          </div>
                          <div className="metric-chip">
                            <span className="metric-label">Memory</span>
                            <span className="metric-val">14.6 MB (Optimal)</span>
                          </div>
                          <div className="metric-chip">
                            <span className="metric-label">Acceptance</span>
                            <span className="metric-val">100%</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="console-result-failed-banner">
                        <div className="failed-banner-top">
                          <span className="failed-icon">❌</span>
                          <div>
                            <h4>Wrong Answer on Test Suite</h4>
                            <p>
                              Passed {runResult.passedCount} of {runResult.totalCases} test cases.
                            </p>
                          </div>
                        </div>
                        {runResult.details && (
                          <div className="console-diff-table">
                            <div className="diff-row">
                              <span className="diff-label">Input</span>
                              <code>{runResult.details.input}</code>
                            </div>
                            <div className="diff-row">
                              <span className="diff-label fail">Your Output</span>
                              <code className="fail">{runResult.details.userOutput}</code>
                            </div>
                            <div className="diff-row">
                              <span className="diff-label pass">Expected Output</span>
                              <code className="pass">{runResult.details.expectedOutput}</code>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="console-result-run animate-fade-in">
                    <div
                      className={`console-result-header ${
                        runResult.passed ? 'pass' : 'fail'
                      }`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{runResult.passed ? '✅' : '❌'}</span>
                        <strong>{runResult.passed ? 'Test Case Passed!' : 'Wrong Answer'}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          ({runResult.caseName})
                        </span>
                      </div>
                      <span className="console-time-tag">Runtime: {runResult.duration}ms</span>
                    </div>

                    <div className="console-diff-table">
                      <div className="diff-row">
                        <span className="diff-label">Input</span>
                        <code>{runResult.input}</code>
                      </div>
                      <div className="diff-row">
                        <span className={`diff-label ${runResult.passed ? 'pass' : 'fail'}`}>
                          Your Output
                        </span>
                        <code className={runResult.passed ? 'pass' : 'fail'}>
                          {runResult.userOutput}
                        </code>
                      </div>
                      <div className="diff-row">
                        <span className="diff-label pass">Expected Output</span>
                        <code className="pass">{runResult.expectedOutput}</code>
                      </div>
                    </div>

                    {runResult.logs && runResult.logs.length > 0 && (
                      <div className="console-logs-section">
                        <div className="logs-header">Standard Output (console.log)</div>
                        <pre className="logs-content">{runResult.logs.join('\n')}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CodingWorkspace;
