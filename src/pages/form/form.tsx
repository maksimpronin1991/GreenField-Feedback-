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
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaTitle, setMediaTitle] = useState("");
    const [feedback, setFeedback] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleRatingChange = (newRating: SetStateAction<number>) => {
        console.log(newRating)
        setRating(newRating);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMediaFile(file);
        }
    };

    return (
        <div>
            <form>
                <h2 className="form-title">Feedback form </h2>
                <div className="form-user">
                    <h2 className="user_title">User:</h2>
                    <p className="user_name">{firstName}</p>
                    <p className="user_last-name">{lastName}</p>
                    {photo && <img src={photo} alt="User" className="user_photo" style={{ width: "100px", height: "100px" }} />}
                </div>
                <div className="form-product">
                    <h2>Наименование:</h2>
                    <p className="product-name">{item.name}</p>
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
                <div>
                    <h2>Фото или видео:</h2>
                    <input type="file" accept="image/*, video/*" onChange={handleFileChange} />
                    {mediaFile && (
                        <div>
                            <p>Предпросмотр:</p>
                            {mediaFile.type.startsWith("image") ? (
                                <img src={URL.createObjectURL(mediaFile)} alt="Preview" style={{ width: "100px" }} />
                            ) : (
                                <video src={URL.createObjectURL(mediaFile)} controls style={{ width: "100px" }} />
                            )}
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Заголовок для медиа"
                        value={mediaTitle}
                        onChange={(e) => setMediaTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        Отзыв:
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                        Оставить отзыв анонимно
                    </label>
                </div>
                <button type="submit">Отправить отзыв</button>
            </form>
        </div>
    )
}


export default FormPage