import Herta1 from '../assets/images/hertaa1.webp'
import Herta2 from '../assets/images/hertaa2.webp'

var random = Math.floor(Math.random() * 2) + 1;

const CatchHerta = random == 1 ? Herta1 : Herta2

export default CatchHerta