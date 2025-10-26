import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [nftCards, setNftCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = {
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1400: {
          items: 4,
        },
      },
      loop: true,
      margin: 12,
      nav: true,
      dots: false,
    };

  async function fetchNftCards() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setNftCards(data);
  }

  useEffect(() => {
    fetchNftCards();
  }, []);

  useEffect(() => {
    if (nftCards.length > 0) {
      setLoading(false);
    }
  }, [nftCards]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <>
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft_coll">
                    <div className="skeleton-box" style={{width:"100%", height:"12rem", borderRadius:"8px"}}>
                    </div>
                    <div className="nft_coll_pp">
                       <div className="skeleton-box" style={{width:"48px", height:"48px", borderRadius:"48px"}}>
                      <i className="fa fa-check"></i>
                    </div>
                    </div>
                    <div className="nft_coll_info" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <h4 className="skeleton-box" style={{width:"80px", height:"16px", margin:"2px"}}></h4>
                        <h4 className="skeleton-box" style={{width:"40px", height:"16px", margin:"2px"}}></h4>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <OwlCarousel
                {...options}
              >
                {nftCards.map((nftCard) => (
                  <div
                    key={nftCard.id}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={nftCard.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={nftCard.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{nftCard.title}</h4>
                        </Link>
                        <span>ERC-{nftCard.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
