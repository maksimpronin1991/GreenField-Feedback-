import { JSX, SetStateAction, useState } from "react";

type FormPageProp = {
    user: {
        firstName: string;
        lastName: string;
        photo: string | null;
    };
    item: {
        name: string;
    };
}

function FormPage({ user, item }: FormPageProp): JSX.Element {
    const { firstName, lastName, photo } = user;

    const [rating, setRating] = useState(0);


    const handleRatingChange = (newRating: SetStateAction<number>) => {
        setRating(newRating);
    };


    return (
        <div>
            <form>
                <h2>Form</h2>
                <div>
                    <h2 className="form_title">Пользователь:</h2>
                    <p className="user_name">Имя: {firstName}</p>
                    <p className="user_last-name">Фамилия: {lastName}</p>
                    {photo && <img src={photo} alt="User" className="user_photo" style={{ width: "100px", height: "100px" }} />}
                </div>
                <div>
                    <h2>Наименование:</h2>
                    <p>{item.name}</p>
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