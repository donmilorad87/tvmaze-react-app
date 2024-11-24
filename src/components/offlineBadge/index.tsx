import './offlineBadge.scss'

const OfflineBadge: React.FC = () => {
    return (
        <div
            className='offlineBadge'
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "8px",
                }}
            >
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"></path>
                <path d="M22 12v-2a2 2 0 0 0-2-2h-4"></path>
                <path d="M7 7V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"></path>
            </svg>
            You are using app offline
        </div>
    );
};

export default OfflineBadge;