import axios from "axios";

const retrieveCharacterList = () => {
	return new Promise((resolve, reject) => {
        axios
        .get("http://192.168.1.104:4000/characters/")
        .then(({ data }) => {
            resolve(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const saveCharacter = (id, characterObj) => {
	return new Promise((resolve, reject) => {
        axios
        .put("http://192.168.1.104:4000/characters/update-character/" + id,
            characterObj)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const createCharacter = (characterObj) => {
	return new Promise((resolve, reject) => {
        axios
        .post("http://192.168.1.104:4000/characters/create-character",
            characterObj)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const deleteCharacter = (id) => {
	return new Promise((resolve, reject) => {
        axios
        .delete("http://192.168.1.104:4000/characters/delete-character/" + id)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

export {retrieveCharacterList, saveCharacter, createCharacter, deleteCharacter};
