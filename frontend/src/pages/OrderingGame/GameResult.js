import React from "react";

const GameResult = ({ message, is_good }) => {
    const backgroundColor = is_good ? "green" : "red";
    const style = {
        padding: "1em",
        backgroundColor: backgroundColor,
        color: "white",
        textAlign: "center",
    };

    return <div style={style}>{message}</div>;
};

export default GameResult;
