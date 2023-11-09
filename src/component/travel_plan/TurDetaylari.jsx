import React from "react";

const TurDetaylari = () => {
    return (
        <div className="tur-detaylari">
            <h2>Bakı-Lənkəran (Xanbulan) Turu</h2>
            <table>
                <thead>
                    <tr>
                        <th>Saat</th>
                        <th>Olay</th>
                        <th>Əməkdaşlar</th>
                        <th>Məbləğ (AZN)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>07:00</td>
                        <td>Yola çıxış (maşın ilə)</td>
                        <td>4 nəfər</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>08:30</td>
                        <td>Hacıqabul, Qədir-Xum restoranında yemək</td>
                        <td>4 nəfər</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td>11:00</td>
                        <td>Lənkərana çatış</td>
                        <td>4 nəfər</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>14:00</td>
                        <td>Xanbulan, tarixi yerlər, meşəlik ərazilər gezintisi</td>
                        <td>4 nəfər</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>14:00</td>
                        <td>Lənkəranda nahar</td>
                        <td>4 nəfər</td>
                        <td>65</td>
                    </tr>
                    <tr>
                        <td>16:00 - 19:00</td>
                        <td>Lənkəran turu</td>
                        <td>4 nəfər</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>19:30</td>
                        <td>Bakıya qayıtmaq üçün yola çıxış</td>
                        <td>4 nəfər</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>21:30</td>
                        <td>Fasilə, fədək restoranında</td>
                        <td>4 nəfər</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>22:30</td>
                        <td>Bakı şəhərinə çatış</td>
                        <td>4 nəfər</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>Arabanın yakıt tutarı</td>
                        <td>-</td>
                        <td>45</td>
                    </tr>
                    <tr>
                        <td colSpan="3">Umumi Məbləğ</td>
                        <td>200</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TurDetaylari;
