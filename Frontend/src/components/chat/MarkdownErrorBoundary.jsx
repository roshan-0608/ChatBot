import { Component } from "react";

// If markdown parsing/rendering ever throws, fall back to the raw text
// instead of crashing the whole chat.
export class MarkdownErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <div className="markdown-fallback">{this.props.content}</div>;
        }
        return this.props.children;
    }
}
