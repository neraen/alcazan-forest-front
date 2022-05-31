import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props) => {
    // <ContentLoader
    //     speed={2}
    //     width={1200}
    //     height={800}
    //     viewBox="0 0 400 150"
    //     backgroundColor="#302c2c"
    //     foregroundColor="#8093c2"
    //     {...props}
    // >
    //     <circle cx="579" cy="228" r="8" />
    //     <rect x="568" y="224" rx="5" ry="5" width="220" height="10" />
    //     <circle cx="586" cy="225" r="8" />
    //     <rect x="554" y="220" rx="5" ry="5" width="220" height="10" />
    //     <circle cx="595" cy="232" r="8" />
    //     <rect x="568" y="229" rx="5" ry="5" width="220" height="10" />
    //     <circle cx="595" cy="262" r="8" />
    //     <rect x="559" y="227" rx="5" ry="5" width="220" height="10" />
    //     <rect x="579" y="225" rx="0" ry="0" width="134" height="15" />
    //     <rect x="478" y="196" rx="0" ry="0" width="208" height="46" />
    //     <rect x="131" y="10" rx="0" ry="0" width="325" height="176" />
    //     <rect x="531" y="219" rx="0" ry="0" width="158" height="14" />
    //     <circle cx="433" cy="214" r="66" />
    // </ContentLoader>
    return(
        <>
        {props.maxWidth && (
            <section className="loader-section" style={{maxWidth: props.maxWidth, maxHeight: props.maxHeight}}>
                <span className="loader-73"></span>
            </section>
        ) || (
            <section className="loader-section">
                <span className="loader-73"></span>
            </section>
        )}
        </>

    )
}

export default Loader