import "./Tutorial.css"

export default function Tutorial({onclick}){
    function handlePropagation(event){
        event.stopPropagation();
    }
    return (
        <div className="window" onClick={onclick}>
            <div className="inner" onClick={handlePropagation} >
                <header>
                    <h3>How to play?</h3>
                </header>
                <img src={process.env.PUBLIC_URL + "/icons/x.svg"} alt="ooppss" onClick={onclick}></img>
                <div className="instruction">
                    <h4>Instruction</h4>
                    <ol>
                        <li></li>
                    </ol>
                </div>
                <div className="faq">
                    <h4>FAQ</h4>
                    <ol>
                        <li></li>
                    </ol>
                </div>
            </div>

        </div>
    )
}