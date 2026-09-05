import type { Category } from '../constants/categories'
import catPet from '../assets/cat-pet.png'
import catFood from '../assets/cat-food.png'
import catTransport from '../assets/cat-transport.png'
import catDaily from '../assets/cat-daily.png'
import catOther from '../assets/cat-other.png'

const categoryImages = new Map([
  ['food', catFood],
  ['transport', catTransport],
  ['daily', catDaily],
  ['pet', catPet],
  ['other-expense', catOther],
])

export function CategorySymbol({ category }: { category: Pick<Category, 'id' | 'emoji'> }) {
  const image = categoryImages.get(category.id)
  return <span className="category-symbol" aria-hidden="true">
    {image ? <img src={image} alt="" width={192} height={192} /> : category.emoji}
  </span>
}
