import BeatLoader from "react-spinners/BeatLoader";
export default function Cards() {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <BeatLoader color="#ffffff" />
        </div>

    );
}