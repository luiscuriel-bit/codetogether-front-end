function ErrorMessage ({ message }){
    if (!message) return null;
    return <div style={{ color: 'red', fontWeight: 'bold' }}>{message}</div>;
};
export default ErrorMessage;