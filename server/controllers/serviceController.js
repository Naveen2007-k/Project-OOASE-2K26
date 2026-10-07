import Service from '../models/Service.js';

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res, next) => {
  try {
    const { name, description, price, durationMinutes, category } = req.body;

    const service = new Service({
      name,
      description,
      price,
      durationMinutes,
      category
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res, next) => {
  try {
    const { name, description, price, durationMinutes, category, isActive } = req.body;

    const service = await Service.findById(req.params.id);

    if (service) {
      service.name = name || service.name;
      service.description = description || service.description;
      service.price = price || service.price;
      service.durationMinutes = durationMinutes || service.durationMinutes;
      service.category = category || service.category;
      if (isActive !== undefined) {
        service.isActive = isActive;
      }

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404);
      throw new Error('Service not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      await Service.deleteOne({ _id: service._id });
      res.json({ message: 'Service removed' });
    } else {
      res.status(404);
      throw new Error('Service not found');
    }
  } catch (error) {
    next(error);
  }
};
