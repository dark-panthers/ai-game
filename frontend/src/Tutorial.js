import "./Tutorial.css"

export default function Tutorial({closeWindow,description,faq}){
    function handlePropagation(event){
        event.stopPropagation();
    }
    return (
        <div className="window" onClick={closeWindow}>
            <div className="inner" onClick={handlePropagation} >
                <header>
                    <h3>How to play?</h3>
                </header>
                <img src={process.env.PUBLIC_URL + "/icons/x.svg"} alt="ooppss" onClick={closeWindow}></img>
                <div className="instruction">
                    <h4>Instruction</h4>
                     <p>
                        {description}

                     </p>                           
                    
                </div>
                <div className="faq">
                    <h4>FAQ</h4>
                    <p>
                        {faq ? {faq} : ""}
                    </p>
                </div>
            </div>

        </div>
    )
}