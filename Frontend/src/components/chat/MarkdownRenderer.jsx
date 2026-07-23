import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock.jsx";
import "./markdown.css";

// Open links in a new tab safely, styled with the app accent.
function MarkdownLink({ href, children }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="md-link">
            {children}
        </a>
    );
}

// Wrap tables so wide tables scroll horizontally instead of breaking the layout.
function MarkdownTable({ children }) {
    return (
        <div className="md-table-wrap">
            <table>{children}</table>
        </div>
    );
}

// Fenced code → syntax-highlighted CodeBlock; inline code → styled pill (markdown.css).
function MarkdownCode({ className, children }) {
    const match = /language-(\w+)/.exec(className || "");
    const raw = String(children).replace(/\n$/, "");
    const isBlock = Boolean(match) || raw.includes("\n");

    if (isBlock) {
        return <CodeBlock language={match ? match[1] : ""} code={raw} />;
    }
    return <code className="md-inline-code">{children}</code>;
}

// react-markdown wraps block code in <pre>; CodeBlock supplies its own container,
// so render the <pre> as a passthrough to avoid a double wrapper.
function MarkdownPre({ children }) {
    return <>{children}</>;
}

const markdownComponents = {
    a: MarkdownLink,
    table: MarkdownTable,
    code: MarkdownCode,
    pre: MarkdownPre,
};

function MarkdownRendererBase({ content }) {
    return (
        <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {content}
            </ReactMarkdown>
        </div>
    );
}

export const MarkdownRenderer = memo(MarkdownRendererBase);
