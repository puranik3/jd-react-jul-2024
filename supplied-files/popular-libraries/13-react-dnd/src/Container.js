import { useState, useCallback } from 'react';
import { Card } from './Card.jsx';
import update from 'immutability-helper';

const style = {
    width: 400,
};

const Container = () => {
        const [cards, setCards] = useState([
            {
                id: 1,
                text: 'Write a cool JS library',
            },
            {
                id: 2,
                text: 'Make it generic enough',
            },
            {
                id: 3,
                text: 'Write README',
            },
            {
                id: 4,
                text: 'Create some examples',
            },
            {
                id: 5,
                text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            },
            {
                id: 6,
                text: '???',
            },
            {
                id: 7,
                text: 'PROFIT',
            },
        ]);

        const moveCard = useCallback((dragIndex, hoverIndex) => {
            setCards((prevCards) => update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }));
        }, []);
        
        return (<>
				<div style={style}>
                    {
                        cards.map((card, i) => (
                            (<Card key={card.id} index={i} id={card.id} text={card.text} moveCard={moveCard}/>)
                        ))
                    }
                </div>
			</>);
};

export default Container;