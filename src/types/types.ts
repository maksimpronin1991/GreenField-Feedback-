type FormPageProp = {
    user: {
        firstName: string;
        lastName: string;
        photo?: string | null;
    };
    item: {
        name: string;
    };
}

export default FormPageProp