export const postLoginData = async(username,password) => {
    const response = await fetch("/api/auth/login",{
        method:"POST",
        body: JSON.stringify({
            username,password
        })
    });
    return response;
};