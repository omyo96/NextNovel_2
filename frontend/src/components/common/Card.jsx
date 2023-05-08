import style from "./Card.module.css";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deletenovel } from "../../api/novel";
import Modal from "react-modal";
import Delete from "../mypage/modal/Delete";

// type cardinfo = {
//   id: number;
//   title: string;
//   introduction: string;
//   author: string;
//   coverImage: string;
//   hitCount: number;
//   commentCount: number;
//   likeCount: number;
// };

// interface CardProps {
//   props: cardinfo;
// }

function Card({ props }) {
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useContext(AuthContext);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const navigate = useNavigate();

  const navigateToPurchase = (id) => {
    navigate(`/library/${id}/intro`, { state: { id: id } });
  };

  const [modal, setModal] = useState(false);

  const delnovel = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const closemodal = () => {
    setModal(false);
  };
  return (
    <>
      <div className={style.card} onClick={(e) => navigateToPurchase(props.id)}>
        <div
          className={isHovering ? style.none : style.intro}
          style={{ backgroundImage: `url(${props && props.coverImage})` }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className={style.introment}>
            <div className={style.ment}>{props && props.introduction}</div>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/img/quote.png"}
            className={style.quote1}
            alt="quote1"
          />
          <img
            src={process.env.PUBLIC_URL + "/img/quote2.png"}
            className={style.quote2}
            alt="quote2"
          />
        </div>
        <div
          className={isHovering ? style.intro : style.none}
          style={{ backgroundImage: `url(${props && props.coverImage})` }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className={style.introment}>
            <div className={style.intro2}>
              <img
                src={process.env.PUBLIC_URL + "/icon/glasses.svg"}
                style={{ margin: "auto 5px" }}
                alt="glasses"
              />
              <span style={{ margin: "0 5px" }}>{props && props.hitCount}</span>
              <img
                src={process.env.PUBLIC_URL + "/icon/heart.svg"}
                style={{ margin: "auto 5px" }}
                alt="heart"
              />
              <span style={{ margin: "0 5px" }}>
                {props && props.likeCount}
              </span>
              <img
                src={process.env.PUBLIC_URL + "/icon/comment.svg"}
                style={{ margin: "auto 5px" }}
                alt="comment"
              />
              <span style={{ margin: "0 5px" }}>
                {props && props.commentCount}
              </span>
            </div>
            {props && user.nickname === props.author ? (
              <img
                onClick={delnovel}
                src={process.env.PUBLIC_URL + "/icon/trash.svg"}
                className={style.trash}
                alt="trash"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={style.info}>
          <div className={style.title}>{props && props.title}</div>
          <div className={style.writer}>{props && props.author}</div>
        </div>
        <img
          src={props && props.cover_img}
          className={style.bookimg}
          alt="bookimg"
        />
      </div>
      <Modal
        isOpen={modal}
        closeTimeoutMS={200}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            zIndex: "100",
          },
          content: {
            width: "75%",
            maxWidth: "792px",
            height: "360px",
            backgroundColor: "#fffefc",
            margin: "auto",
            inset: 0,
          },
        }}
      >
        <Delete type="novel" id={props && props.id} closemodal={closemodal} />
      </Modal>
    </>
  );
}

export default Card;
