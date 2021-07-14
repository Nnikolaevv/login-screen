import axios from "../plugins/axios";

export async function registration(email, password, ...data) {
    const nickname = data.nickname || 'Nickname';
    const first_name = data.first_name || 'FirstName';
    const last_name = data.last_name || 'LastName'
    const phone = data.phone || '123123123';
    const gender_orientation = data.gender_orientation || 'male';
    const city = data.city || 'Moscow';
    const country = data.country || 'Russia';
     const date_of_birth_day = data.date_of_birth_day || '01';
    const date_of_birth_month = data.date_of_birth_month || '01';
    const date_of_birth_year = data.date_of_birth_year || '2001';
    try {
        const response = await axios.post(
            `/auth/signup`,
            JSON.stringify({email,
                password,
                nickname,
                first_name,
                last_name,
                phone,
                gender_orientation,
                city,
                country,
                date_of_birth_day,
                date_of_birth_month,
                date_of_birth_year}),
        )
        console.log(response)
        return response
    }
    catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
}