import type { Category } from '../constants/categories'
import catPet from '../assets/cat-pet.png'

export function CategorySymbol({ category }: { category: Pick<Category, 'id' | 'emoji'> }) {
  return <span className="category-symbol" aria-hidden="true">
    {category.id === 'pet' ? <img src={catPet} alt="" width={192} height={192} /> : category.emoji}
  </span>
}
