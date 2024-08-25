import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { RatingModel } from "../models/RatingModel";
import { UserPreferenceModel } from "../models/UserPreference";

const adminRouter = express.Router();

// Route to get average ratings
adminRouter.get(
  "/average-ratings",
  asyncHandler(async (req: Request, res: Response) => {
    const ratings = await RatingModel.aggregate([
      {
        $group: {
          _id: null,
          avgQuestion1: { $avg: "$question1" },
          avgQuestion2: { $avg: "$question2" },
          avgQuestion3: { $avg: "$question3" },
          avgQuestion4: { $avg: "$question4" },
          avgQuestion5: { $avg: "$question5" },
        },
      },
    ]);

    res.json(ratings[0] || {});
  })
);

// Route to get favorite styles
adminRouter.get(
  "/favorite-styles",
  asyncHandler(async (req: Request, res: Response) => {
    const userPreferences = await UserPreferenceModel.aggregate([
      {
        $group: {
          _id: null,
          stylePercentages: { $push: "$stylePercentages" },
        },
      },
      {
        $project: {
          _id: 0,
          stylePercentages: {
            $reduce: {
              input: "$stylePercentages",
              initialValue: {},
              in: {
                $mergeObjects: [
                  "$$value",
                  {
                    $arrayToObject: {
                      $map: {
                        input: { $objectToArray: "$$this" },
                        as: "item",
                        in: {
                          k: "$$item.k",
                          v: { $avg: "$$item.v" },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ]);

    res.json(userPreferences[0] || {});
  })
);

export default adminRouter;
