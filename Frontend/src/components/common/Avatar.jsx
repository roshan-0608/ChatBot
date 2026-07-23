import { RobotIcon } from "./icons.jsx";
import "./Avatar.css";

export function Avatar({ type, initial }) {
    if (type === "robot") {
        return (
            <div className="avatar avatar-robot" aria-label="Assistant">
                <RobotIcon />
            </div>
        );
    }

    return (
        <div className="avatar avatar-user" aria-label="You">
            {initial || "U"}
        </div>
    );
}
