import { PageArea } from "./style";

import notfound from "../../assets/notfound.jpg";

const NotFoundPage = () => {
    return (
        <PageArea>
            <div className="container">
                <img src={notfound} alt="logo iFuture"/>
            </div>
        </PageArea>
    );
};

export default NotFoundPage;