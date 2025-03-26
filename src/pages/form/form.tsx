import { JSX, useState, useRef } from "react";
import FormPageProp from "../../types/types";
import { useForm } from "react-hook-form";

interface FormValues {
  media?: FileList;
  feedback: string;
  rating: number;
  isAnonymous: boolean;
}

function FormPage({ user, item }: FormPageProp): JSX.Element {

  const [formData, setFormData] = useState<unknown>(null);
  const [rating, setRating] = useState(0);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    reset,
    
  } = useForm<FormValues>({
    mode: "onChange"
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSubmit = async () => {

    setValue('rating', rating);
    setValue('feedback', feedback);
    setValue('isAnonymous', isAnonymous);
    
    if (mediaFile) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(mediaFile);
      setValue('media', dataTransfer.files);
    }

    const isValid = await trigger();
    
    if (isValid) {
      const validatedData = {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          photo: user.photo
        },
        product: {
          name: item.name
        },
        rating,
        feedback,
        isAnonymous,
        media: mediaFile
      };

      setFormData(validatedData);
      console.log("Validated form data:", validatedData);
      resetForm();
    }
  };

  const resetForm = () => {
    setRating(0);
    setMediaFile(null);
    setFeedback('');
    setIsAnonymous(false);
    setIsSubmitted(true);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    // Сброс react-hook-form
    reset({
      media: undefined,
      feedback: '',
      rating: 0,
      isAnonymous: false
    });

    // Через 3 секунды сбрасываем статус отправки
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMediaFile(file || null);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleAnonymousChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAnonymous(e.target.checked);
  };

  const handleMediaRemove = () => {
    setMediaFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue('media', undefined);
  };

  return (
    <div className="form-container">
      <form noValidate>
        <h2 className="form-title">Feedback form</h2>
        
        <div className="form-user">
          <h3>User:</h3>
          <p>{user.firstName} {user.lastName}</p>
          {user.photo && (
            <img 
              src={user.photo} 
              alt="User" 
              className="user-photo" 
              width={100} 
              height={100} 
            />
          )}
        </div>

        <div className="form-product">
          <h3>Product:</h3>
          <p>{item.name}</p>
        </div>

        <div className="form-section">
          <label>
            Add photo/video:
            <input
              type="file"
              accept="image/*,video/*"
              {...register("media", {
                required: "Please select a file",
                validate: {
                  fileSize: (files) => 
                    !files?.[0] || files[0].size <= 5 * 1024 * 1024 || "Max file size is 5MB",
                  fileType: (files) =>
                    !files?.[0] || 
                    files[0].type.startsWith("image/") || 
                    files[0].type.startsWith("video/") || 
                    "Only images and videos are allowed"
                }
              })}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {errors.media && (
              <span className="error">{errors.media.message}</span>
            )}
          </label>

          {mediaFile && (
            <div className="media-preview">
              <p>Preview:</p>
              {mediaFile.type.startsWith("image") ? (
                <img 
                  src={URL.createObjectURL(mediaFile)} 
                  alt="Preview" 
                  width={100} 
                />
              ) : (
                <video 
                  src={URL.createObjectURL(mediaFile)} 
                  controls 
                  width={100} 
                />
              )}
              <button 
                type="button" 
                onClick={handleMediaRemove}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="form-section">
          <label>
            Feedback:
            <textarea
              {...register("feedback", {
                required: "Feedback is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
                maxLength: { value: 500, message: "Maximum 500 characters" }
              })}
              value={feedback}
              onChange={handleFeedbackChange}
              rows={5}
            />
            {errors.feedback && (
              <span className="error">{errors.feedback.message}</span>
            )}
          </label>
        </div>

        <div className="form-section">
          <label>
            Rating:
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? "active" : ""}`}
                  style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </span>
              ))}
              <input
                type="hidden"
                {...register("rating", {
                  required: "Please select a rating",
                  validate: (value) => value > 0 || "Please select a rating"
                })}
              />
            </div>
            {errors.rating && (
              <span className="error">{errors.rating.message}</span>
            )}
          </label>
        </div>

        <div className="form-section">
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              {...register("isAnonymous")}
              onChange={handleAnonymousChange}
            />
            Submit anonymously
          </label>
        </div>

        <button 
          type="button" 
          onClick={validateAndSubmit}
          className={`submit-button ${isSubmitted ? 'disabled' : ''}`}
          disabled={isSubmitted}
        >
          Submit Feedback
        </button>
        {isSubmitted && (
          <div className="success-message">
            Thank you for your feedback! The form has been cleared.
          </div>
        )}
      </form>
    </div>
  );
}

export default FormPage;