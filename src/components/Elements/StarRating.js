export const StarRating = ({ rating = 0 }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <i key={i} className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
            ))}
            {halfStar && <i className="text-lg bi bi-star-half text-yellow-500 mr-1"></i>}
            {[...Array(emptyStars)].map((_, i) => (
                <i key={i} className="text-lg bi bi-star text-yellow-500 mr-1"></i>
            ))}
        </div>
    )
}
