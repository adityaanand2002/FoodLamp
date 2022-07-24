import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../components/navbar";
import _ from "lodash";
import { getRecipes, likeRecipe } from "../services/recipeService";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
const Likes = (props) => {
  console.log(props);
  const [likesArray, setLikesArray] = useState([]);
  useEffect(() => {
    setLikesArray((props.data && props.data.likes) || []);
  }, [props]);
  const handleLike = async (e, name, link) => {
    try {
      console.log(e, link);
      await likeRecipe(name, link);
      props.loadData();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div class="modal fade" id="likesModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Liked Recipes
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {likesArray &&
              likesArray.map(
                (item) =>
                  Object.keys(item).length !== 0 && (
                    <div>
                      <a
                        href={`${
                          JSON.parse(item).link &&
                          JSON.parse(item).link.slice(0, 7) !== "http://"
                            ? "https://"
                            : ""
                        }${JSON.parse(item).link}`}
                        target="_blank"
                      >
                        {JSON.parse(item).name}
                      </a>

                      <span
                        id="like"
                        onClick={(e) =>
                          handleLike(
                            e,
                            JSON.parse(item).name,
                            JSON.parse(item).link
                          )
                        }
                      >
                        {likesArray.includes(item) == true ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </span>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Likes;
