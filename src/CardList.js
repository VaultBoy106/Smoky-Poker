import react, {Component} from 'react'; 
import Card from './Card';
import axios from 'axios';
import './cardList.css'
class CardList extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {deck_id: null, drawn: [], remaining: 51}
        this.renderCards = this.renderCards.bind(this)
    }
    handleClick(){
     
        if(this.state.remaining !== 0){
            axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`).then((res) => {
                const card = res.data.cards[0]
                const alt_tag = `${res.data.cards[0].suit} ${res.data.cards[0].value}`
                const zIdx = Math.abs(res.data.remaining - 51)
                    this.setState((st) => ({
                        remaining: res.data.remaining,
                        drawn: [...st.drawn, {id: res.data.remaining, card_face: card.image, info: alt_tag , zIdx: zIdx}]
                    }))
                })
        }else {
            alert('No more cards in the deck!')
        }
    }

    componentDidMount(){
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then((res) => {   
            this.setState({deck_id: res.data.deck_id})
        })
    }
    renderCards(){
        return this.state.drawn.map((card) => (
            <Card key = {card.id} imgUrl = {card.card_face} altTag = {card.info} zIdx = {card.zIdx}/>
        ))
    }
    render() {

        return (
            <div className='main-container'>
                <div className='Deck'>
                    <p className='Deck-title'> ♦ Smoky Poker ♦ </p>
                    <p className='Deck-title subtitle'> ♦ Demo game made with react ♦ </p>
                </div>
                
                <button className='Deck-btn' onClick={this.handleClick}> Add card </button>
                
                <div className='card-container'>
                    {this.state.drawn !== [] ? this.renderCards() : <p>Get a card</p>}  
                </div>
            
            </div>
        )
    }
}
export default CardList