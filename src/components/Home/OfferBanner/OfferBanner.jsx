import React from "react";
import "./OfferBanner.css";

const OfferBanner = () => {
    return (
        <section className="offer-banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">

                    </div>
                    <div className="col-lg-6">
                        <div className="offer-content">
                            <h2 className="title">Sunglasses</h2>
                            <h3 className="subtitle">Super Offer</h3>

                            <p className="desc">Acetate Frame Sunglasses</p>
                            <p className="price">$40.00 Only</p>

                            <a href="/collection?category=Sunglasses" className="btn-offer">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default OfferBanner;
