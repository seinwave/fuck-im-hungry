import React from 'react';


const QuickReply = (props) => {

        return (
            <a style={{ margin: 3}} href="/" className="btn btn-primary"
               onClick={(event) =>
                   props.click(
                       event,
                       props.reply
                   )
               }>
                {props.reply}
            </a>
        );
    };

export default QuickReply;

   

