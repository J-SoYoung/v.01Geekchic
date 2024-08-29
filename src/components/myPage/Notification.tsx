import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loadAllNotification,
  removeNotification,
} from "../../api/firebase";
import { Link } from "react-router-dom";
import { NotificationDataType } from "../../types/usedType";

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
        const isSalsesPending = notification.salesStatus === "pending";
        const isCompletion = notification.salesStatus === "completion";
        return (
          <Link
            to={`/message/${notification.itemId}/${notification.buyerId}`}
            state={{ userId, messageId: notification.messageId }}
            key={notification.notificationId}
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
              </div>
            )}
            {isCompletion && (
              <button
                onClick={() =>
                  onClickRemoveNotification(notification.notificationId)
                }
              >
                X
              </button>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Notification;
