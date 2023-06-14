export const getUserAll = async() => {
    const response = await fetch("/api/users",{
        method:"GET"
    });
    return response;
};