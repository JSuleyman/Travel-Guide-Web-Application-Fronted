import React, { useEffect, useState } from 'react';
import CreateWalletManagement from './hasNotMoney/CreateWalletManagement';
import WelcomeWalletManagement from './hasMoney/WelcomeWalletManagement';
import makeApiRequest from '../../api/makeApiRequest';
import './WalletManagement.css'

function WalletManagement() {
    const [data, setData] = useState("");
    const [showCreateWallet, setShowCreateWallet] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        makeApiRequest('https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/is_have_total_money', 'GET')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                // setLoading(false);
            });
    }, [showCreateWallet]);

    const handleCreateWalletSubmission = () => {
        setShowCreateWallet(false);
    };

    return (
        <div>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                data.haveTotalMoney ? (
                    <WelcomeWalletManagement data={data} />
                ) : (
                    showCreateWallet ? (
                        <CreateWalletManagement onSubmission={handleCreateWalletSubmission} />
                    ) : (
                        <button onClick={() => setShowCreateWallet(true)}>Pul Kisənizi İdarə Edin</button>
                    )
                )
            )}
        </div>
    );
}

export default WalletManagement;




// import React, { useEffect, useState } from 'react';
// import CreateWalletManagement from './hasNotMoney/CreateWalletManagement';
// import WelcomeWalletManagement from './hasMoney/WelcomeWalletManagement';
// import makeApiRequest from '../../api/makeApiRequest';

// function WalletManagement() {
//     const [data, setData] = useState("");
//     const [showCreateWallet, setShowCreateWallet] = useState(false);

//     useEffect(() => {
//         makeApiRequest('https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/is_have_total_money', 'GET')
//             .then(response => {
//                 setData(response.data);
//                 console.log(response.data.haveTotalMoney);
//             })
//             .catch(error => {

//             });
//     }, [showCreateWallet]);

//     const handleCreateWalletSubmission = () => {
//         // CreateWalletManagement bileşeni Submit işlemi tamamlandığında bu işlev çağrılır
//         // Burada başka bir şeyler yapabilirsiniz
//         setShowCreateWallet(false); // Bileşeni gizleyin veya başka bir şey yapabilirsiniz
//     };

//     return (
//         <div>
//             {!data.haveTotalMoney ? (
//                 showCreateWallet ? (
//                     <CreateWalletManagement onSubmission={handleCreateWalletSubmission} />
//                 ) : (
//                     <button onClick={() => setShowCreateWallet(true)}>Create Wallet</button>
//                 )
//             ) : (
//                 <WelcomeWalletManagement data={data} />
//             )}
//         </div>
//     );
// }

// export default WalletManagement;
