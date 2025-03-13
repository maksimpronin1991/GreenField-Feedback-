import { JSX, SetStateAction, useState } from "react";

function FormPage(): JSX.Element {
    const [rating, setRating] = useState(0);


    const handleRatingChange = (newRating: SetStateAction<number>) => {
        setRating(newRating);
      };


    return (
        <div>
            <form>
                <h2 className="form_title">Form</h2>
                <div className="user">
                    <p className="user_name">Mark</p>
                    <img
                        src="#"
                        alt="User photo"
                        className="user_photo"
                    />
                </div>
                <div>
                    <p className="product_name">
                        Product 1
                    </p>
                </div>
                <div>
                    <label>
                        Оценка:
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                                onClick={() => handleRatingChange(star)}
                            >
                                ★
                            </span>
                        ))}
                    </label>
                </div>
            </form>
        </div>
    )
}

export default FormPage