import React, { useState, useEffect } from 'react';
import axios from 'axios';
import makeApiRequest from '../../api/makeApiRequest';

const QuestionAnswer = () => {
    const [sorularCevaplar, setSorularCevaplar] = useState([]);
    const [cevaplar, setCevaplar] = useState({});
    const [soruIndex, setSoruIndex] = useState(0);

    useEffect(() => {
        makeApiRequest(
            "https://travel-guide-backend-7e73c60545d8.herokuapp.com/questions_answer",
            "GET"
        )
            .then((response) => {
                setSorularCevaplar(response.data);
            })
            .catch((error) => {
                console.error('Soruları ve cevapları alma hatası:', error);

            });
    }, []);

    const handleChange = (soruId, cevap) => {
        setCevaplar(prevCevaplar => ({
            ...prevCevaplar,
            [soruId]: cevap
        }));
    };

    const handleSonraki = () => {
        if (soruIndex < sorularCevaplar.length - 1) {
            setSoruIndex(prevIndex => prevIndex + 1);
        } else {
            axios.post('https://travel-guide-backend-7e73c60545d8.herokuapp.com/answer', cevaplar)
                .then(response => {
                    // Başarılı yanıt durumu
                    console.log(response.data);
                })
                .catch(error => {
                    // Hata durumu
                    console.error('Cevapları gönderme hatası:', error);
                });
        }
    };

    if (sorularCevaplar.length === 0) {
        return <div>Sorular ve cevaplar yükleniyor...</div>;
    }

    const aktifSoruCevap = sorularCevaplar[soruIndex];

    return (
        <div>
            <h2>{aktifSoruCevap.questions}</h2>
            <div key={aktifSoruCevap.answerId}>
                <input type="radio" name={aktifSoruCevap.questionId} value={aktifSoruCevap.answerId} onChange={e => handleChange(aktifSoruCevap.questionId, e.target.value)} />
                <label>{aktifSoruCevap.answer}</label>
            </div>
            <button onClick={handleSonraki}>Sonraki</button>
        </div>
    );
}

export default QuestionAnswer;
