import { Link } from "wouter";
import { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/products?category=${category.slug}`}>
      <a className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
        <div className="h-40 overflow-hidden relative">
          <img 
            src={category.imageUrl || ""} 
            alt={category.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <h3 className="text-white font-semibold text-xl p-4">{category.name}</h3>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CategoryCard;
