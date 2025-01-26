import { createOrderService } from './orderService';
import { catchAsync } from '../../utils/catchAsync';

export const createOrderController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await createOrderService(data);

  res.status(200).json({
    status: true,
    message: 'Order placed successfully',
    data: result,
  });
});
