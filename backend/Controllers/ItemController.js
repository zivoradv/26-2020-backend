const Item = require('../Models/ItemModel')

const createItem = async (req, res) => {
    try {
        const item = await Item.create(req.body)
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getItemsPerPage = async (req, res) => {
    try {
        const { page } = req.params;
        const itemsPerPage = req.query.itemsPerPage || 10; 
        const skipCount = (page - 1) * itemsPerPage;

        const items = await Item.find().skip(skipCount).limit(itemsPerPage);

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const searchItems = async (req, res) => {
  const searchQuery = req.query.searchQuery;
  const noItemsFound = 'no';
  try {
    const searchResults = await Item.find({ Material: { $regex: searchQuery, $options: 'i' } });

    if (searchResults.length === 0) {
      return res.json({ noItemsFound });
    }

    const count = searchResults.length;
    res.json({ count, searchResults });
  } catch (error) {
    console.error('Error searching for items:', error);
    res.status(500).json({ error: 'An error occurred while searching for items.' });
  }
};

const getItems = async (req, res) => {
    try {
        const items = await Item.find();

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findById(id)
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findByIdAndDelete(id)
        res.status(200).json("Item deleted successfully")
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findByIdAndUpdate(
            { _id: id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if (!item) {
            res.status(404).json(`No item with that id.`)
        }
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const uploadItem = async (req, res) => {
    try {
        const item = await Item.create(req.body)
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const countDoc = async (req, res) => {
    try {
        const aggregationPipeline = [
            { $count: "string" }
        ];

        const aggregatedResult = await Item.aggregate(aggregationPipeline);

        res.status(200).json(aggregatedResult);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getAvgWeight = async (req, res) => {
    try {
        const aggregationPipeline =
            [
                {
                    $match: {
                        Weight: { $type: "number" },
                        Weight: { $ne: NaN }
                    }
                },
                {
                    $group: {
                        _id: null,
                        averageWeight: { $avg: "$Weight" }
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        const aggregatedResult = await Item.aggregate(aggregationPipeline);

        res.status(200).json(aggregatedResult);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getArrivedItems = async (req, res) => {
    try {
        const aggregationPipeline =
            [
                {
                    $match: {
                      ArrivalDate: { $ne: null }
                    }
                  },
                  {
                    $group: {
                      _id: null,
                      currentArrivedItems: { $sum: 1 }
                    }
                  },
                  {
                      $project: {
                          _id: 0
                      }
                  }
            ]
        const aggregatedResult = await Item.aggregate(aggregationPipeline);

        res.status(200).json(aggregatedResult);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getCarriers = async (req, res) => {
    try {
        const aggregationPipeline = [
            {
                $group: {
                    _id: '$Carrier',
                    itemCount: { $sum: 1 },
                }
            },
            {
                $match: {
                    _id: { $ne: null },
                    _id: { $not: /^$/ },
                }
            },
            {
                $sort: {
                    itemCount: -1
                }
            },
            {
                $limit: 5 
            }
        ];

        const aggregatedResult = await Item.aggregate(aggregationPipeline);

        res.status(200).json(aggregatedResult);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem,
    getItemsPerPage,
    uploadItem,
    countDoc,
    getAvgWeight,
    getArrivedItems,
    getCarriers,
    searchItems
}