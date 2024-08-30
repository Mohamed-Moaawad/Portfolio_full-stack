const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const Content = require('../models/ContentModel');
const Section = require('../models/SectionModel');
const Page = require('../models/PageModel');
const UploadFilePath = path.join(`uploads/`);

exports.getPage = async (req, res) => {
    const { pageName } = req.params;

    try {
        const page = await Page.findOne({ name: pageName })
            .populate({
                path: 'Sections',
                populate: {
                    path: 'Contents',
                    model: 'Content'
                }
            });
        if (!page) {
            return res.status(404).json({ msg: 'Page not found' });
        }
        const {Sections} = page;
        res.json(Sections);
        // res.json(page);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};




// Update Home page


exports.updatePage = async (req, res) => {
  let { requestData } = req.body;
  const { pageName } = req.params;

  try {
    requestData = JSON.parse(requestData);
    const { sections } = requestData;

    console.log('Files uploaded:', req.files);

    let page = await Page.findOne({ name: pageName });
    if (!page) {
      page = new Page({ name: pageName, Sections: [] });
    }

    for (const sectionData of sections) {
      let section = await Section.findOne({ title: sectionData.title, _id: { $in: page.Sections } });
      if (!section) {
        section = new Section({ title: sectionData.title, Contents: [] });
        page.Sections.push(section._id);
      }

      if (!section.Contents) {
        section.Contents = [];
      }

      for (const contentData of sectionData.Contents) {
        let content = await Content.findOne({ title: contentData.title, _id: { $in: section.Contents } });
        console.log(contentData.title);
        if (!content) {
          content = new Content({
            title: contentData.title,
            type: contentData.type,
            data: contentData.data
          });
          await content.save();
        } else {
            console.log('in else')
          content.type = contentData.type;

          const imageFieldMapping = {
            'homeAbout': 'homeAboutImage',
            'homeServices': 'homeServicesImage',
            'homeBrief': 'homeBriefImage',
            'homeBlogs': 'homeBlogImage'
          };

          const imageFieldName = imageFieldMapping[contentData.title];
          console.log('Image field name:', imageFieldName);

          if (imageFieldName && req.files && Array.isArray(req.files)) {
            const matchingImageFile = req.files.find(
              (file) => file.fieldname === imageFieldName
            );

            if (matchingImageFile) {
              contentData.data[imageFieldName] = `/uploads/${pageName}/${matchingImageFile.filename}`;
            } else {
              console.warn(`No image uploaded for field: ${imageFieldName}`);
            }
          }

          content.data = contentData.data;
          await content.save();
        }

        if (!section.Contents.includes(content._id)) {
          section.Contents.push(content._id);
        }
      }
      await section.save();
    }

    await page.save();
    res.json(page);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};