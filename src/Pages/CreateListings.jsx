import React from "react";
import { useState, useEffect, useRef } from "react";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from  '../FireBaseConfig'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
function CreateListings(){
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    numberofrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    gmapLink: "",
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    numberofrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    gmapLink,
  } = formData;
  

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  
  useEffect(() => {
    if (isMounted.current) {
      if (isMounted) {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setFormData({ ...formData, userRef: user.uid });
          } else {
            navigate("/sign-in");
          }
        });
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice > regularPrice) {
      toast.error("Discounted price cannot be more than regular price");
      setLoading(false);
      return;
    }
    if (images.length === 0 || images.length > 6) {
      toast.error("Please select between 1 and 5 images");
      setLoading(false);
      return;
    }
  
    // Store image in firebase
    const storeImage = async (image) => {
                 
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }

        );

      });

    };

      const imageUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch(() => {
        setLoading(false);
        toast.error("Images not uploaded");
        return;
      });

     
      const formDataCopy = {
        ...formData,
        imageUrls,  
        timestamp: serverTimestamp(),
      }
  
      formDataCopy.location = address
      delete formDataCopy.images
      delete formDataCopy.address
      !formDataCopy.offer && delete formDataCopy.discountedPrice
      setLoading(false);

      const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
      setLoading(false)
      toast.success('Listing saved')
      navigate(`/create-listing`)

  }

   
  
    const onMutate = (e) => {
      let boolean = null;
  
      if (e.target.value === "true") {
        boolean = true;
      }
      if (e.target.value === "false") {
        boolean = false;
      }
  
      // Files
      if (e.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          images: e.target.files,
        }));
      }
  
      // Text/Booleans/Numbers
      if (!e.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: boolean ?? e.target.value,
        }));
      }
  
  };
  if (loading) return <Spinner />;
  return (
    <div>
      <div className="profile">
        <header>
          <p className="pageHeader">Create a Listing</p>
        </header>
        <main>
          <form className="form" onSubmit={handleSubmit}>
            <label className="formLabel">Sell / Rent</label>
            <div className="formButtons">
              <button
                type="button"
                className={type === "sale" ? "formButtonActive" : "formButton"}
                id="type"
                value="sale"
                onClick={onMutate}
              >
                Sell
              </button>
              <button
                type="button"
                className={type === "rent" ? "formButtonActive" : "formButton"}
                id="type"
                value="rent"
                onClick={onMutate}
              >
                Rent
              </button>
            </div>

            <label className="formLabel">Name</label>
            <input
              className="formInputName"
              type="text"
              id="name"
              value={name}
              onChange={onMutate}
              maxLength="32"
              minLength="10"
              required
            />

            <div className="formRooms flex">
              <div>
                <label className="formLabel">Bedrooms</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="bedrooms"
                  value={bedrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
              </div>

              <div>
                <label className="formLabel">Number of Rooms</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="numberofrooms"
                  value={numberofrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
              </div>
              <div>
                <label className="formLabel">Bathrooms</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="bathrooms"
                  value={bathrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
              </div>
            </div>

            <label className="formLabel">Parking spot</label>
            <div className="formButtons">
              <button
                className={parking ? "formButtonActive" : "formButton"}
                type="button"
                id="parking"
                value={true}
                onClick={onMutate}
                min="1"
                max="50"
              >
                Yes
              </button>
              <button
                className={
                  !parking && parking !== null
                    ? "formButtonActive"
                    : "formButton"
                }
                type="button"
                id="parking"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>

            <label className="formLabel">Furnished</label>
            <div className="formButtons">
              <button
                className={furnished ? "formButtonActive" : "formButton"}
                type="button"
                id="furnished"
                value={true}
                onClick={onMutate}
              >
                Yes
              </button>
              <button
                className={
                  !furnished && furnished !== null
                    ? "formButtonActive"
                    : "formButton"
                }
                type="button"
                id="furnished"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>

            <label className="formLabel">Address</label>
            <textarea
              className="formInputAddress"
              type="text"
              id="address"
              value={address}
              onChange={onMutate}
              required
            />

            <div className="formLatLng">
              <label className="formLabel">Map Link</label>
              <input
                className="formInputName"
                type="link"
                id="gmapLink"
                value={gmapLink}
                onChange={onMutate}
              />
            </div>

            <label className="formLabel">Offer</label>
            <div className="formButtons">
              <button
                className={offer ? "formButtonActive" : "formButton"}
                type="button"
                id="offer"
                value={true}
                onClick={onMutate}
              >
                Yes
              </button>
              <button
                className={
                  !offer && offer !== null ? "formButtonActive" : "formButton"
                }
                type="button"
                id="offer"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>

            <label className="formLabel">Regular Price</label>
            <div className="formPriceDiv">
              <input
                className="formInputSmall"
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onMutate}
                min="50"
                max="750000000"
                required
              />
              {type === "rent" && <p className="formPriceText">$ / Month</p>}
            </div>

            {offer && (
              <>
                <label className="formLabel">Discounted Price</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onMutate}
                  min="50"
                  max="750000000"
                  required={offer}
                />
              </>
            )}

            <label className="formLabel">Images</label>
            <p className="imagesInfo">
              The first image will be the cover (max 6).
            </p>
            <input
              className="formInputFile"
              type="file"
              id="images"
              onChange={onMutate}
              max="6"
              accept=".jpg,.png,.jpeg"
              multiple
              required
            />
            <button type="submit" className="primaryButton createListingButton">
              Create Listing
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};
export default CreateListings;