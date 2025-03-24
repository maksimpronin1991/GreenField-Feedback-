import { JSX, SetStateAction, useState, useRef } from "react"; // Добавлен useRef
import FormPageProp from "../../types/types";
import { useForm } from "react-hook-form";

function FormPage({ user, item }: FormPageProp): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
    });

    const { firstName, lastName, photo } = user;

    const [rating, setRating] = useState(0);
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [feedback, setFeedback] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    const onSubmit = () => {
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

    const handleMediaRemove = () => {
        setMediaFile(null); 
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
    };

    const validateFileSize = (file: File) => {
        const maxSize = 5 * 1024 * 1024; 
        if (file.size > maxSize) {
            return "Файл слишком большой. Максимальный размер: 5 МБ.";
        }
        return true;
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <input
                        {...register('media', { 
                            required: 'Необходимо добавить фото или видео',
                            validate: (value: FileList) => {
                                if (value && value.length > 0) {
                                    const file = value[0];
                                    return validateFileSize(file);
                                }
                                return true;
                            },

                        })}
                        className="media-input"
                        type="file"
                        accept="image/*, video/*"
                        onChange={handleFileChange}
                        ref={(e) => {
                            fileInputRef.current = e; 
                            register('media').ref(e); 
                        }}
                    />
                    {errors.media && <span>{errors.media.message as string}</span>}
                    {mediaFile && (
                        <div>
                            <p>Предпросмотр:</p>
                            {mediaFile.type.startsWith("image") ? (
                                <img src={URL.createObjectURL(mediaFile)} alt="Preview" style={{ width: "100px" }} />
                            ) : (
                                <video src={URL.createObjectURL(mediaFile)} controls style={{ width: "100px" }} />
                            )}
                            <button 
                                className="remove-button" 
                                onClick={handleMediaRemove}
                                type="button" 
                            >
                                Удалить
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <label>
                        Отзыв:
                        <textarea
                            {...register('feedback', { 
                                required: 'Это поле обязательно',
                                minLength: {
                                    value: 10,
                                    message: 'Отзыв должен содержать минимум 10 символов'
                                },
                                maxLength:{
                                    value: 500,
                                    message: 'Отзыв не может быть длиннее 500 символов'
                                }
                            })}
                            className="form-textarea"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        {errors.feedback && <span>{errors.feedback.message as string}</span>}
                    </label>
                </div>
                <div>
                    <label>
                        Рейтинг:
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                                onClick={() => handleRatingChange(star)}
                            >
                                ★
                            </span>
                        ))}
                        <input
                            type="hidden"
                            {...register('rating', { 
                                required: 'Рейтинг обязателен',
                                validate: (value) => value > 0 || 'Выберите рейтинг'
                            })}
                            value={rating}
                        />
                        {errors.rating && <span>{errors.rating.message as string}</span>}
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

export default FormPage;