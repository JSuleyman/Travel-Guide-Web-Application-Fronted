import React, { useState } from 'react';
import './SeyahatPlanlamaFormu.css';
import makeApiRequest from '../../api/makeApiRequest';

const SeyahatPlanlamaFormu = () => {
    const [seyahatAmaci, setSeyahatAmaci] = useState('');
    const [seyahatArkadaslari, setSeyahatArkadaslari] = useState('');
    const [aktiviteler, setAktiviteler] = useState('');
    const [yiyecekTercihleri, setYiyecekTercihleri] = useState('');

    const seyahatAmaciOptions = ['Tatil', 'İş Seyahati', 'Macera', 'Kültürel Gezi'];
    const seyahatArkadaslariOptions = ['Aile', 'Arkadaşlar', 'Partner', 'Çocuklar'];
    const aktivitelerOptions = ['Müzeler', 'Doğa Yürüyüşleri', 'Alışveriş', 'Restoranlar'];
    const yiyecekTercihleriOptions = ['Vejetaryen', 'Vegan', 'Gluten-Free', 'Diğer'];

    const handleSubmit = (e) => {
        makeApiRequest("https://travel-guide-main-de97df9e068d.herokuapp.com/is_answer","POST");
        // e.preventDefault();
        // Form verilerinin işlenmesi burada yapılabilir
        console.log('Seyahat Amacı:', seyahatAmaci);
        console.log('Seyahat Arkadaşları:', seyahatArkadaslari);
        console.log('Aktiviteler ve İlgi Alanları:', aktiviteler);
        console.log('Yiyecek Tercihleri:', yiyecekTercihleri);
    };

    return (
        <div className="form-container-soru">
            <form onSubmit={handleSubmit}>
                <div className="form-group-soru">
                    <label className="form-label-soru">Seyahat Amacı:</label>
                    <select className="form-select-soru" value={seyahatAmaci} onChange={(e) => setSeyahatAmaci(e.target.value)} required>
                        <option value="">Seçiniz</option>
                        {seyahatAmaciOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group-soru">
                    <label className="form-label-soru">Seyahat Arkadaşları:</label>
                    <select className="form-select-soru" value={seyahatArkadaslari} onChange={(e) => setSeyahatArkadaslari(e.target.value)} required>
                        <option value="">Seçiniz</option>
                        {seyahatArkadaslariOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group-soru">
                    <label className="form-label-soru">Aktiviteler ve İlgi Alanları:</label>
                    <select className="form-select-soru" value={aktiviteler} onChange={(e) => setAktiviteler(e.target.value)} required>
                        <option value="">Seçiniz</option>
                        {aktivitelerOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group-soru">
                    <label className="form-label-soru">Yiyecek Tercihleri:</label>
                    <select className="form-select-soru" value={yiyecekTercihleri} onChange={(e) => setYiyecekTercihleri(e.target.value)} required>
                        <option value="">Seçiniz</option>
                        {yiyecekTercihleriOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-btn-soru">Gönder</button>
            </form>
{/* 
            <TurDetaylari/>
            <BakıLenkəranTurHarita/> */}
        </div>
    );
};

export default SeyahatPlanlamaFormu;