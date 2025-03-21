import { JSX, SetStateAction, useState } from "react";
import FormPageProp from "../../types/types";


function FormPage({ user, item }: FormPageProp): JSX.Element {
    const { firstName, lastName, photo } = user;

    const [rating, setRating] = useState(0);
    const [mediaFile, setMediaFile] = useState<File | null>(null);
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = {
            firstName,
             lastName,
              photo,
            rating,
            mediaFile,
            feedback,
            isAnonymous,
        };
    
        console.log("Form Data:", formData);
    
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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

                <div className="media">
                    <h2>Добавьте фото или видео вашего {item.name}</h2>
                    <input className="media-input" type="file" accept="image/*, video/*" onChange={handleFileChange} />
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
                </div>
                <div>
                    <label>
                        Отзыв:
                        <textarea
                            className="form-textarea"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
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