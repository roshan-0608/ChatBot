import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "../common/CopyButton.jsx";
import "./CodeBlock.css";

const LANGUAGE_LABELS = {
    js: "JavaScript",
    javascript: "JavaScript",
    jsx: "JSX",
    ts: "TypeScript",
    typescript: "TypeScript",
    tsx: "TSX",
    py: "Python",
    python: "Python",
    java: "Java",
    cpp: "C++",
    c: "C",
    go: "Go",
    rust: "Rust",
    html: "HTML",
    css: "CSS",
    json: "JSON",
    sql: "SQL",
    bash: "Bash",
    sh: "Shell",
    shell: "Shell",
    yaml: "YAML",
    yml: "YAML",
    markdown: "Markdown",
    md: "Markdown",
};

export function CodeBlock({ language, code }) {
    const label = LANGUAGE_LABELS[language?.toLowerCase()] || language || "Code";

    return (
        <div className="code-block">
            <div className="code-block-header">
                <span className="code-block-lang">{label}</span>
                <CopyButton text={code} label="Copy code" className="code-block-copy" />
            </div>
            <SyntaxHighlighter
                language={language || "text"}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    padding: "16px",
                    background: "transparent",
                    fontSize: "13.5px",
                }}
                codeTagProps={{ style: { fontFamily: '"SFMono-Regular", "SF Mono", Menlo, Consolas, monospace' } }}
                wrapLongLines={false}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
