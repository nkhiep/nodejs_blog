const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("course/show", { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render("course/create");
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render("course/edit", {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/an_webp/${formData.videoId}/mqdefault_6s.webp?du=3000&sqp=CNjd07AG&rs=AOn4CLAPBnORa-3Sl6CeikbfYcy6a36B3Q`;
        course
            .save()
            .then(() => res.redirect("/"))
            .catch((error) => {});
    }
}

module.exports = new CourseController();
