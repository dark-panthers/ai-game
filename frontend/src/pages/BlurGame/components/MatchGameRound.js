import React from 'react'
import { useState } from 'react'

function MatchGameRound({image, prompts, answer, mode, onSubmitAnswer}) {
    const [currentAnswer, setCurrentAnswer] = useState(null);

    let removeChecked = () => {
        let inputs = document.querySelectorAll('input:checked')
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].checked = false
        }
    }

    return (
        <>
            <div>
                <img className={mode} src={image} alt=''></img>
            </div>
            <div className='promptsContainer' onChange={(e)=> setCurrentAnswer(e.target.value)}>
                {prompts.map((prompt, index) => {
                    return (
                        <div className='promtsRow' key={index}>
                            <input key={"input"+index} type='radio' value={prompt} id={index} name='answer'></input>
                            <label className='promtLabel' key={"label"+index} htmlFor={index}>
                            {prompt}
                            </label>
                        </div>
                    )
                })}

                <button className='nextButton' onClick={() => {removeChecked(); setCurrentAnswer(null); onSubmitAnswer(currentAnswer)}}>Next</button>
            </div>

            
        </>
    )
}

export default MatchGameRound