import api from "./api";

const PORT = process.env.PORT || 3000;

api.listen(PORT, () => {
    console.log(`started on port ${PORT}`);
});
