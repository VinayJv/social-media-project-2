export const postLoginData = async(username,password) => {
    const response = await fetch("/api/auth/login",{
        method:"POST",
        body: JSON.stringify({
            username,password
        })
    });
    return response;
};

export const postSignUpData = async(email,password,name,username) => {
    const response = await fetch("/api/auth/signup",{
        method:"POST",
        body: JSON.stringify({
            email,password,name,username 
        })
    });
    return response;
};