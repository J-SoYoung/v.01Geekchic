import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loadAllNotification,
  NotificationDataType,
  removeNotification,
  updateOrderUsedStatus,
} from "../../api/firebase";

const Notification = ({ userId }: { userId: string | undefined }) => {
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => {
      if (userId) return loadAllNotification({ userId, itemId: null });
    },
    retry: 3,
    retryDelay: 1000,
  });

  const orderStateMutation = useMutation({
    mutationFn: async ({
      notification,
      sellerId,
    }: {
      notification: NotificationDataType;
      sellerId: string;
    }) => {
      await updateOrderUsedStatus({
        notification,
        sellerId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["notifications"],
          refetchType: "active",
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true }
      );
    },
  });

  // 구매 요청 승인 ( 상태 업데이트 )
  const onClickPurchaseApprove = (notification: NotificationDataType) => {
    orderStateMutation.mutate({
      notification,
      sellerId: userId as string,
    });
  };

  const removeNotificationMutation = useMutation({
    mutationFn: async (id: string) => {
      if (userId) {
        await removeNotification({ notificationId: id, userId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["notifications"],
          refetchType: "active",
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true }
      );
    },
  });

  const onClickRemoveNotification = (id: string) => {
    removeNotificationMutation.mutate(id);
  };
  
  return (
    <div className="my-4">
      <h3 className=" text-left mb-2 text-xl bold">Notification</h3>
      {notifications?.map((notification: NotificationDataType) => {
        const isSalsesPending = notification.status === "pending";
        const isApproved = notification.status === "approved";
        return (
          <div
            key={notification.id}
            className={`p-4 mb-2 flex justify-between text-left text-white rounded-md ${
              isSalsesPending ? "bg-[#8F5BBD]" : "bg-gray-400"
            }`}
          >
            {userId == notification.buyerId ? (
              // 구매자인 경우
              <p className="text-white">
                [ {notification.itemName} ]
                {isSalsesPending
                  ? " 판매 수락을 기다리고 있습니다."
                  : " 구매되었습니다."}
              </p>
            ) : (
              // 판매자인 경우
              <div className="w-full text-white flex justify-between items-center">
                <p>
                  [ {notification.itemName} ]
                  {isSalsesPending
                    ? " 구매 요청이 있습니다."
                    : " 판매 완료 되었습니다."}
                </p>
                {isSalsesPending && (
                  <button
                    className="px-4 py-2 bg-white text-[#8F5BBD] rounded"
                    onClick={() => onClickPurchaseApprove(notification)}
                  >
                    OK
                  </button>
                )}
              </div>
            )}
            {isApproved && (
              <button
                onClick={() => onClickRemoveNotification(notification.id)}
              >
                X
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
